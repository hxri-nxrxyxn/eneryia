package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/savr/controller"
	"gorm.io/gorm"
)

func CameraRoutes(db *gorm.DB, app *fiber.App) {
	api := app.Group("/api/v1")
	api.Post("/barcode", controller.Barcode(db))
}
