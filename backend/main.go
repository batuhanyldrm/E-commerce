package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/stripe/stripe-go/v74"
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
	stripe.Key = "sk_test_51NDVcUJVbJVgaTyyWRJxS0zPxpTaHJvmriQ5jJbFf7dbBTizwlQdp4xooJy8iqnVNmL8FQAC0WlVX6gySg1FurN200VTizr6dz"

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

	//edit user
	app.Put("/user/:userId", api.UpdateUserHandler)

	//auth
	app.Post("/register", api.PostRegisterHandler)
	app.Post("/login", api.PostLoginHandler)
	app.Get("/users", api.GetUsersHandler)
	app.Get("/users/:email", api.GetUserHandler)
	app.Get("/user/:id", api.GetUserIDHandler)
	app.Post("/logout", api.GetUserLogoutHandler)
	app.Get("/user", api.GetUserAuthenticationHandler)

	//stripe payment you can control stripe web site
	app.Post("/create-payment-intent", api.HandleCreatePaymentIntent)

	return app
}
