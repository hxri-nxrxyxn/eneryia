package controller

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/savr/models"
	"gorm.io/gorm"
)

type RecID struct {
	RecipeID uint `json:"recid"`
}

func CreateRecipe(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		recipe := new(models.Recipe)

		err := c.BodyParser(recipe)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "Could not parse Body",
				"error":   err.Error(),
			})
		}

		err = db.Create(recipe).Error
		if err != nil {

			return c.Status(501).JSON(fiber.Map{
				"message": "Could not create recipe",
				"error":   err.Error(),
			})
		}

		return c.Status(201).JSON(fiber.Map{
			"message": "Recipe created",
			"data":    recipe,
		})
	}
}

func GetRecipe(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		id := c.Params("id")

		recipe := new(models.Recipe)
		err := db.Where("recipe_id = ?", id).First(recipe).Error
		if err != nil {
			if strings.Contains(err.Error(), "record not found") {
				return c.Status(404).JSON(fiber.Map{
					"message": "Recipe not found",
				})
			}

			return c.Status(500).JSON(fiber.Map{
				"message": "Could not retrieve Recipe",
				"error":   err.Error(),
			})
		}

		return c.Status(200).JSON(fiber.Map{
			"data": recipe,
		})
	}
}

func AddRecipe(db *gorm.DB) func(*fiber.Ctx) error {
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

		recid := new(RecID)
		err = c.BodyParser(recid)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "Could not parse Body",
				"error":   err.Error(),
			})
		}

		user.RecID = append(user.RecID, int64(recid.RecipeID))

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
