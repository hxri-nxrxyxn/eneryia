package controller

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/savr/models"
	"gorm.io/gorm"
)

type IngID struct {
	IngredientID uint `json:"ingid"`
}

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
			"message": "Recipe created",
			"data":    ingredient,
		})
	}
}

func GetIngredient(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		id := c.Params("id")

		ingredient := new(models.Ingredient)
		err := db.Where("ingredient_id = ?", id).First(ingredient).Error
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
			"message": "Retrieved Ingredients",
			"data":    ingredient,
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
			"data": ingredients,
		})
	}
}

func AddIngredient(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		id := c.Params("id")

		user := new(models.User)
		err := db.Where("user_id = ?", id).First(user).Error
		if err != nil {
			if strings.Contains(err.Error(), "record not found") {
				return c.Status(404).JSON(fiber.Map{
					"message": "User not found",
				})
			}

			return c.Status(500).JSON(fiber.Map{
				"message": "Could not retrieve user",
				"error":   err.Error(),
			})
		}

		ingid := new(IngID)
		err = c.BodyParser(ingid)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "Could not parse Body",
				"error":   err.Error(),
			})
		}

		user.IngID = append(user.IngID, int64(ingid.IngredientID))

		err = db.Save(user).Error
		if err != nil {
			return c.Status(501).JSON(fiber.Map{
				"message": "Could not update user",
				"error":   err.Error(),
			})
		}

		return c.Status(200).JSON(fiber.Map{
			"message": "User updated",
			"data":    user,
		})
	}
}
