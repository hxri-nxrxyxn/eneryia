package controller

import (
	"strings"

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

func GetIngredient(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		id := c.Params("id")

		user := new(models.User)
		err := db.Where("ingredient_id = ?", id).First(user).Error
		if err != nil {
			if strings.Contains(err.Error(), "record not found") {
				return c.Status(404).JSON(fiber.Map{
					"message": "Ingredient not found",
				})
			}

			return c.Status(500).JSON(fiber.Map{
				"message": "Could not retrieve Ingredient",
				"error":   err.Error(),
			})
		}

		return c.Status(200).JSON(fiber.Map{
			"message": "Retrieved user",
			"data":    user,
		})
	}
}

func GetIngredients(db *gorm.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		ingredients := new([]models.Ingredient)

		err := db.Find(ingredients).Error
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"message": "Could not retrieve ingredients",
				"error":   err.Error(),
			})
		}

		return c.Status(200).JSON(fiber.Map{
			"message": "Retrieved ingredients",
			"data":    ingredients,
		})
	}
}
