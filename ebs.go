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

// number of simulations
const Epoch = 5

type Issue struct {
	id, dev string
	estimated, actual int
}

type Estimate struct {
	id, dev string
	estimates [Epoch]int
}

func main() {

	issues, err := ReadCsv("timesheet.csv")
	if err != nil {
		panic(err)
	}
	
	release := estimateRelease(issues)
	futures := calcFutures(release)
	totals := calcTotalEffort(futures)
	fmt.Println("release: ", release)
	fmt.Println("futures: ", futures)
	fmt.Println("totals: ", totals)
}

func estimateRelease(issues []Issue) []Estimate {

	rand.Seed(time.Now().UnixNano())

	// key: dev, value: velocity history for last 6 months
	velocity := map[string][]float64{}
	release := []Estimate{}

	// estimate possible futures
	for k, issue := range issues {
		// calculate velocity history for each dev
		if _, ok := velocity[issue.dev]; !ok {
			velocity[issue.dev] = calcVelocity(issue.dev)
		}
		// generate predictions for each issue
		lenv := len(velocity[issue.dev])
		release = append(release, Estimate{ issue.id, issue.dev, [Epoch]int{} })
		for i := 0; i < Epoch; i++ {
			// pick random velocity for each iteration
			randv := velocity[issue.dev][rand.Intn(lenv)]
			release[k].estimates[i] = int(math.Round(float64(issue.estimated) / randv))
		}
	}

	return release
}

func calcFutures(release []Estimate) map[string][]int {

	futures := map[string][]int{}

	for i := 0; i < Epoch; i++ {
		for _, issue := range release {
			if _, ok := futures[issue.dev]; !ok || len(futures[issue.dev]) == i {
				futures[issue.dev] = append(futures[issue.dev], 0)
			}
			futures[issue.dev][i] += issue.estimates[i]
		}
	}

	return futures
}

func calcTotalEffort(futures map[string][]int) [Epoch]int {

	totals := [Epoch]int{}
	
	for i := 0; i < Epoch; i++ {
		max := -1
		for _, future := range futures {
			if future[i] > max {
				max = future[i]
			}
		}
		totals[i] = max
	}

	return totals
}


func calcShipDate(startDate string) string {

	const shortForm = "02 Jan 2006"
	t, _ := time.Parse(shortForm, startDate)
	return t.Format(shortForm)
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
		estimatedHrs, _ := strconv.Atoi(line[2])
		actualHrs, _ := strconv.Atoi(line[3])
		issues = append(issues, Issue{
			id: line[0],
			dev: line[1],
			estimated: estimatedHrs,
			actual: actualHrs})
	}

    return issues, nil
}
