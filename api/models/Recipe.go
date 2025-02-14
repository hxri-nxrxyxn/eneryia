package models

import (
	"gorm.io/gorm"
)

type Recipe struct {
	RecipeID     uint         `gorm:"primaryKey;autoIncrement" json:"id"`
	Name         *string      `gorm:"type:varchar(255)" json:"name"`
	Instruction  string       `gorm:"type:varchar(255)" json:"instruction"`
	Ingredients  []Ingredient `json:"ingredients"`
	CookingtTime int          `gorm:"type:int" json:"cooking_time"`
	Happy        int          `gorm:"type:int" json:"happy"`
	Calories     int          `gorm:"type:int" json:"calories"`
}

func MigrateRecipe(db *gorm.DB) error {
	err := db.AutoMigrate(&Recipe{})
	return err
}
