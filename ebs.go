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

const Epoch = 5

type Issue struct {
	id string
	dev string
	estimated int64
	actual int64
}

func main() {

	issues, err := ReadCsv("timesheet.csv")
	if err != nil {
		panic(err)
	}
	
	release := estimateRelease(issues)

	fmt.Println(release)
}

func estimateRelease(issues []Issue) map[string][Epoch]int {

	rand.Seed(time.Now().UnixNano())

	// key: dev, value: velocity history for last 6 months
	velocity := map[string][]float64{}
	// key: issue id, value: 100 estimated effort predictions
	release := map[string][Epoch]int{}

	// calculate velocity history for each dev
	for _, issue := range issues {
		if _, ok := velocity[issue.dev]; !ok {
			velocity[issue.dev] = calcVelocity(issue.dev)
		}
	}

	// generate 100 predictions for each issue
	for _, issue := range issues {
		i := 0
		lenv := len(velocity[issue.dev])
		estimate := [Epoch]int{}
		for i < Epoch {
			// pick random velocity for each iteration
			randv := velocity[issue.dev][rand.Intn(lenv)]
			estimate[i] = int(math.Round(float64(issue.estimated) / randv))
			i++
		}
		release[issue.id] = estimate
	}

	return release
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
		estimatedHrs, _ := strconv.ParseInt(line[2], 10, 64) 
		actualHrs, _ := strconv.ParseInt(line[3], 10, 64)
		issues = append(issues, Issue{
			id: line[0],
			dev: line[1],
			estimated: estimatedHrs,
			actual: actualHrs})
	}

    return issues, nil
}
