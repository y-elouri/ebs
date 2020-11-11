const velocity = (data, x, y) => {
    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "TODO",
        "data": { "values": data },
        "layer": [
            {
                "mark": { "type": "circle", "tooltip": true },
                "encoding": {
                    "x": { "field": x, "type": "quantitative" },
                    "y": { "field": y, "type": "quantitative" }
                }
            },
            {
                "mark": {
                    "type": "line",
                    "color": "firebrick"
                },
                "transform": [
                    {
                        "regression": y,
                        "on": x
                    }
                ],
                "encoding": {
                    "x": { "field": x, "type": "quantitative" },
                    "y": { "field": y, "type": "quantitative" }
                }
            },
            {
                "transform": [
                    {
                        "regression": y,
                        "on": x,
                        "params": true
                    },
                    {
                        "calculate": "'R²: '+format(datum.rSquared, '.2f')",
                        "as": "R2"
                    }
                ],
                "mark": {
                    "type": "text",
                    "color": "firebrick",
                    "x": "width",
                    "align": "right",
                    "y": -5
                  },
                "encoding": {
                    "text": {"type": "nominal", "field": "R2"}
                }
            }
        ]
    };
};

const devShipDate = (data, x, y) => {
    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "TODO",
        "data": { "values": data },
        "transform": [
            { "flatten": [x] }
        ],
        "mark": { "type": "boxplot", "extent": "min-max" },
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
        "mark": { "type": "line", "point": true, "tooltip": true },
        "encoding": {
            "x": { "field": x, "type": "temporal" },
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
                "x": { "bin": true, "field": x, "type": "temporal" },
                "y": {
                    "field": { "repeat": "layer" },
                    "type": "quantitative",
                    "title": null
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
