package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/stripe/stripe-go/v74"
)

/* func email() {
	from := os.Getenv("FromEmailAddr")
	password := os.Getenv("SMTPpwd")

	toEmail := os.Getenv("yildirimbatu52@gmail.com")
	to := []string{toEmail}

	host := "smtp.gmail.com"
	port := "587"
	address := host + ":" + port

	subject := "Subject: Our Golang mail\n"
	body := "Our first email!"
	message := []byte(subject + body)

	auth := smtp.PlainAuth("", from, password, host)

	err := smtp.SendMail(address, auth, from, to, message)
	if err != nil {
		fmt.Println("err:", err)
		return
	}
	fmt.Println("go check your email")

} */

func main() {
	repository := NewRepository()
	service := NewService(repository)
	api := NewApi(&service)
	app := SetupApp(&api)
	app.Listen(":8080")
	//email()

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

	//order
	app.Post("/order", api.PostOrderHandler)

	//stripe payment you can control stripe web site
	app.Post("/create-payment-intent", api.HandleCreatePaymentIntent)

	return app
}
