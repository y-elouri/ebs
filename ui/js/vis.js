const velocity = (data, x, y) => {
    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "TODO",
        "data": { "values": data },
        "mark": "circle",
        "encoding": {
            "x": { "field": x, "type": "quantitative" },
            "y": { "field": y, "type": "quantitative" }
        }
    };
};

const devShipDate = (data, x, y) => {
    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "TODO",
        "data": { "values": data },
        "mark": {
            "type": "boxplot",
            "extent": "min-max"
        },
        "encoding": {
            "x": {
                "field": x,
                "type": "quantitative",
                "scale": { "zero": false }
            },
            "y": { "field": y, "type": "nominal" }
        }
    };
};

const releaseConfidence = (data, x, y) => {
    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "TODO",
        "data": { "values": data },
        "mark": {
            "type": "line",
            "point": true
        },
        "encoding": {
            "x": { "field": x, "type": "temporal", "title": "Ship date" },
            "y": {
                "field": y,
                "type": "quantitative",
                "axis": { "format": ".0%" },
                "title": null
            }
        }
    };
};

const releaseChange = (data, x, y95, y50, y5) => {
    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "TODO",
        "data": { "values": data },
        "repeat": { "layer": [y95, y50, y5] },
        "spec": {
            "mark": "line",
            "encoding": {
                "x": {
                    "bin": true,
                    "field": x,
                    "type": "temporal"
                },
                "y": {
                    "field": { "repeat": "layer" },
                    "type": "quantitative",
                    "title": "TODO"
                },
                "color": {
                    "datum": { "repeat": "layer" },
                    "type": "nominal"
                }
            }
        }
    };
};

export { velocity, devShipDate, releaseConfidence, releaseChange };
