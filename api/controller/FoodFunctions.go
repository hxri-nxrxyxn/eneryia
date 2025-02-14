package controller

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func FOod(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		return c.SendString("Get User")
	}
}
