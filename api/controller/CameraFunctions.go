package controller

import (
	"bytes"
	"encoding/base64"
	"image"

	"github.com/gofiber/fiber/v2"
	"github.com/savr/models"
	"gorm.io/gorm"
)

func Barcode(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		photo := new(models.Image)

		err := c.BodyParser(photo)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "Could not parse Body",
				"error":   err.Error(),
			})
		}

		data, err := base64.StdEncoding.DecodeString(photo.Base64)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "Could not decode base64",
				"error":   err.Error(),
			})
		}

		img, _, err := image.Decode(bytes.NewReader(data))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "Failed to decode image",
				"error":   err.Error(),
			})
		}

		

	}
}
