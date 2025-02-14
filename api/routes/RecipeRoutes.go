package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/savr/controller"
	"gorm.io/gorm"
)

func RecipeRoutes(db *gorm.DB, app *fiber.App) {
	api := app.Group("/api/v1")
	api.Post("/ingredient", controller.CreateIngredient(db))
	api.Get("/ingredient/:id", controller.GetIngredient(db))
	api.Get("/ingredients", controller.GetIngredients(db))
	api.Put("/ingredient/:id", controller.AddIngredient(db))
}
