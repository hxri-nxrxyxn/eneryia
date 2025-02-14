package controller

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/savr/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func GetUser(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		return c.SendString("Get User")
	}
}

func GetUsers(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		return c.SendString("Get Users")
	}
}

func UpdateUser(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		return c.SendString("Get User")
	}
}

func Login(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		return c.SendString("Get User")
	}
}

func CreateUser(db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		user := new(models.User)

		err := c.BodyParser(user)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "Could not parse Body",
				"error":   err.Error(),
			})
		}

		if user.Email == "" || user.Password == "" {
			return c.Status(401).JSON(fiber.Map{
				"message": "Email or Password is missing",
			})
		}

		hasedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"message": "Could not hash password",
				"error":   err.Error(),
			})
		}

		user.Password = string(hasedPassword)

		err = db.Create(user).Error
		if err != nil {

			if strings.Contains(err.Error(), "SQLSTATE 23505") {
				return c.Status(402).JSON(fiber.Map{
					"message": "Email already exists",
				})
			}

			return c.Status(501).JSON(fiber.Map{
				"message": "Could not create user",
				"error":   err.Error(),
			})
		}

		return c.Status(201).JSON(fiber.Map{
			"message": "User created",
			"data":    user,
		})
	}
}
