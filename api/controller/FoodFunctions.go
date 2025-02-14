package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/savr/models"
	"gorm.io/gorm"
)

func CreateIngredient(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		ingredient := new(models.Ingredient)

		err := c.BodyParser(ingredient)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "Could not parse Body",
				"error":   err.Error(),
			})
		}

		err = db.Create(ingredient).Error
		if err != nil {


			return c.Status(501).JSON(fiber.Map{
				"message": "Could not create ingredient",
				"error":   err.Error(),
			})
		}

		return c.Status(201).JSON(fiber.Map{
			"message": "User created",
			"data":    ingredient,
		})
	}
}
