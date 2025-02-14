package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/savr/controller"
	"gorm.io/gorm"
)

func RecipeRoutes(db *gorm.DB, app *fiber.App) {
	api := app.Group("/api/v1")
	api.Post("/recipe", controller.CreateRecipe(db))
	api.Get("/recipe/:id", controller.GetRecipe(db))
	api.Put("/recipe/:id", controller.AddRecipe(db))
}
