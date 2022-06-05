const express = require("express");
const app = express();
const data = require("./data.json");

app.get('/recipes', (req, res, next) => {
    res.json(data.recipes.map((recipe) => recipe.name));
});

app.get('/recipes/details/:name', (req, res, next) => {
    const index = data.recipes.findIndex((recipe) => recipe.name === req.params.name);
    res.json({
        ingredients: data.recipes[index].ingredients,
        numSteps: data.recipes[index].instructions.length,
    });
});

app.post('/recipes', (req, res, next ) => {
    if (data.recipes.findIndex((recipe) => recipe.name === req.json.name) >= 0) {
        res.status(400).json({"error": "Recipe already exists"});
    } else {
        data.recipes.push(req.json);
        res.status(201);
    }
});

app.put('/recipes', (req, res, next) => {
    const recipeIndex = data.recipes.findIndex((recipe) => recipe.name === req.json.name);
    if (recipeIndex >= 0) {
        data.recipes[recipeIndex] = req.json;
        res.status(204);
    } else {
        res.status(404).json({"error": "Recipe does not exist"})
    }
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

