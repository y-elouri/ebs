package main

import (
	"encoding/csv"
	"os"
	"fmt"
	"strconv"
	"math"
	"math/rand"
	"time"
)

// Epoch is the number of simulations
const Epoch = 100

type Issue struct {
	id, dev string
	estimate, actual int
}

// Release is a representation of all issues and assigned devs in a given release.
// key: dev, value: array of issue estimates in hours.
type Release = map[string][]int

// Futures is Epoch number of possible futures for each developer.
// key: dev, value: total effort for each possible future.
type Futures = map[string][Epoch]int

func main() {
	issues, err := ReadCsv("timesheet.csv")
	if err != nil {
		panic(err)
	}
	release := prepareRelease(issues)
	futures := Futures{}
	for dev, estimates := range release {
		futures[dev] = predictFutures(dev, estimates)
	}
	releaseHrs := releaseHours(futures)
	shipDates := []string{}
	for i := 0; i < Epoch; i++ {
		shipDates = append(shipDates, shipDate("20 Sep 2020", releaseHrs[i]))
	}
	confidence := confidenceDistrubtion(shipDates)
	fmt.Println("confidence: ", confidence)
}

// prepareRelease creates a map of each dev with their estimates per assigned issue.
func prepareRelease(issues []Issue) Release {
	release := Release{}
	for _, issue := range issues {
		release[issue.dev] = append(release[issue.dev], issue.estimate)
	}
	return release
}

// predictFutures predicts Epoch number of actual effort for each estimate in dev hours.
// It takes the dev id and an array of estimates, each corresponding to a single issue.
func predictFutures(dev string, issuesEstimates []int) [Epoch]int {
	rand.Seed(time.Now().UnixNano())
	totals := [Epoch]int{}
	velocity := calcVelocity(dev)
	lenv := len(velocity)
	for i := 0; i < Epoch; i++ {
		for _, estimate := range issuesEstimates {
			randv := velocity[rand.Intn(lenv)]
			totals[i] += int(math.Round(float64(estimate) / randv))
		}
	}
	return totals
}

// releaseHours calculates maximum hours in each possible future for the entire release.
func releaseHours(futures Futures) [Epoch]int {
	hours := [Epoch]int{}
	for i := 0; i < Epoch; i++ {
		max := -1
		for _, future := range futures {
			if future[i] > max {
				max = future[i]
			}
		}
		hours[i] = max
	}
	return hours
}

// shipDate converts dev hours into a calendar date, excluding weekends.
func shipDate(startDate string, effort int) string {
	const shortForm = "02 Jan 2006"
	t, _ := time.Parse(shortForm, startDate)
	days := int(math.Ceil(float64(effort) / 8))
	for i := 0; i < days; i++ {
		t = t.AddDate(0, 0, 1)
		weekday := t.Weekday()
		if weekday == time.Saturday {
			t = t.AddDate(0, 0, 2)
		}
		if weekday == time.Sunday {
			t = t.AddDate(0, 0, 1)
		}
	}
	return t.Format(shortForm)
}

// confidenceDistrubtion calculates the probabily of each ship date for the entire release.
func confidenceDistrubtion(shipDates []string) map[string]float64 {
	totals := map[string]int{}
	for _, date := range shipDates {
		totals[date]++
	}
	probablities := map[string]float64{}
	for date, total := range totals {
		probablities[date] = float64(total) / Epoch
	}
	return probablities
}

func calcVelocity(dev string) []float64 {
	return []float64{0.6, 0.7, 0.5, 0.4, 0.7, 0.6}
}

func ReadCsv(filename string) ([]Issue, error) {
    // open CSV file
    f, err := os.Open(filename)
    if err != nil {
        return []Issue{}, err
    }
    defer f.Close()

    // read lines
    lines, err := csv.NewReader(f).ReadAll()
    if err != nil {
        return []Issue{}, err
	}

	// prepare the data
	issues := []Issue{}
	for _, line := range lines[1:] {
		estimateHrs, _ := strconv.Atoi(line[2])
		actualHrs, _ := strconv.Atoi(line[3])
		issues = append(issues, Issue{
			id: line[0],
			dev: line[1],
			estimate: estimateHrs,
			actual: actualHrs})
	}

    return issues, nil
}
