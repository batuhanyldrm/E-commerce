package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	repository := NewRepository()
	service := NewService(repository)
	api := NewApi(&service)
	app := SetupApp(&api)
	app.Listen(":3001")
}

func SetupApp(api *Api) *fiber.App {
	app := fiber.New()
	os.Setenv("BUCKET_NAME", "graduation-project-5ff56.appspot.com")

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:3000",
		AllowHeaders:     "Origin, Content-Type, Accept",
	}))

	//stock
	app.Get("/stocks", api.GetStocksHandler)
	app.Get("/image/:imageID", api.GetImageHandler)
	app.Put("stocks/:id/amount", api.UpdateStocksAmountHandler)
	app.Get("/stocks/:id", api.GetStockHandler)
	app.Put("/stocks/:id", api.UpdateStocksHandler)
	app.Post("/stocks", api.PostStocksHandler)
	app.Delete("/stocks/:id", api.DeleteStocksHandler)
	app.Get("/search", api.GetSearchHandler)

	//auth
	app.Post("/register", api.PostRegisterHandler)
	app.Post("/login", api.PostLoginHandler)
	app.Get("/users", api.GetUsersHandler)
	app.Get("/users/:email", api.GetUserHandler) //kontrol edilecek
	app.Get("/user/:id", api.GetUserIDHandler)
	app.Post("/logout", api.GetUserLogoutHandler)
	app.Get("/user", api.GetUserAuthenticationHandler)

	return app
}
