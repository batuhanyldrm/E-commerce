package main

import (
	"errors"
	"strings"
	"time"

	"example/models"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	Repository *Repository
}

func NewService(Repository *Repository) Service {
	return Service{
		Repository: Repository,
	}
}

func (service *Service) GetStocks() ([]models.Product, error) {

	stocks, err := service.Repository.GetStocks()

	if err != nil {
		return nil, err
	}

	return stocks, nil
}

func (service *Service) GetSearch(query string) ([]models.Product, error) {

	stocks, err := service.Repository.GetProductsWithQuery(query)

	if err != nil {
		return nil, err
	}

	return stocks, nil
}

func (service *Service) GetStock(ID string) (models.Product, error) {

	stock, err := service.Repository.GetStock(ID)

	if err != nil {
		return models.Product{}, nil
	}

	return stock, nil
}

func (service *Service) UpdateStocksAmount(productDTO models.ProductDTO, ID string) (*models.Product, error) {

	stock, err := service.Repository.GetStock(ID)
	if err != nil {
		return nil, err
	}

	stock.Amount = stock.Amount - productDTO.Amount
	stock.UpdatedAt = time.Now().UTC().Round(time.Second)

	err = service.Repository.UpdateStocks(stock, ID)

	if err != nil {
		return nil, err
	}

	return &stock, nil
}

func (service *Service) UpdateStocks(productDTO models.ProductDTO, ID string) (*models.Product, error) {

	stock, err := service.Repository.GetStock(ID)
	if err != nil {
		return nil, err
	}

	stock.ProductName = productDTO.ProductName
	stock.ProductCode = productDTO.ProductCode
	stock.Size = productDTO.Size
	stock.Color = productDTO.Color
	stock.Description = productDTO.Description
	stock.Price = productDTO.Price
	stock.Amount = productDTO.Amount
	stock.UpdatedAt = time.Now().UTC().Round(time.Second)

	err = service.Repository.UpdateStocks(stock, ID)

	if err != nil {
		return nil, err
	}

	return &stock, nil
}

func (service *Service) PostStocks(productDTO models.ProductDTO) *models.Product {

	stock := models.Product{}
	stock.ID = GenerateUUID(8)
	stock.CreatedAt = time.Now().UTC().Round(time.Second)
	stock.UpdatedAt = time.Now().UTC().Round(time.Second)
	stock.ProductName = productDTO.ProductName
	stock.ProductCode = productDTO.ProductCode
	stock.Size = productDTO.Size
	stock.Color = productDTO.Color
	stock.Description = productDTO.Description
	stock.Price = productDTO.Price
	stock.Amount = productDTO.Amount
	stock.Image = productDTO.Image

	err := service.Repository.PostStocks(stock)
	if err != nil {
		return nil
	}

	return &stock
}

func (service *Service) PostOrder(orderDTO models.OrderDTO, user models.Register) *models.Order {

	order := models.Order{}
	order.ID = GenerateUUID(8)
	//userId düzelecek
	order.UserId = user.ID
	order.ProductList = orderDTO.ProductList
	order.Address = orderDTO.Address
	order.TotalPrice = orderDTO.TotalPrice
	order.Payment = orderDTO.Payment
	order.Discount = orderDTO.Discount
	order.Status = orderDTO.Status
	order.CreatedAt = time.Now().UTC().Round(time.Second)
	order.UpdatedAt = time.Now().UTC().Round(time.Second)
	order.AdditionalNote = orderDTO.AdditionalNote

	err := service.Repository.PostOrder(order)
	if err != nil {
		return nil
	}

	return &order
}

func (service *Service) DeleteStocks(stockId string) error {

	err := service.Repository.DeleteStocks(stockId)

	if err != nil {
		return err
	}

	return nil
}

func (service *Service) UpdateUser(userId string, userDTO models.RegisterDTO) (*models.Register, error) {

	user, err := service.Repository.GetUserID(userId)
	if err != nil {
		return nil, err
	}

	//password, _ := bcrypt.GenerateFromPassword([]byte(userDTO.Password), 14)

	user.Company = userDTO.Company
	user.Name = userDTO.Name
	user.Surname = userDTO.Surname
	user.Email = userDTO.Email
	user.Tel = userDTO.Tel
	//user.Password = string(password)
	user.UpdatedAt = time.Now().UTC().Round(time.Second)

	err = service.Repository.UpdateUser(userId, user)

	if err != nil {
		return nil, err
	}
	return &user, nil

}

func (service *Service) PostRegister(registerDTO models.RegisterDTO) *models.Register {

	/* _, err := service.Repository.GetUser(registerDTO.Email)
	if err == nil {
		return nil
	} */

	userRegister := models.Register{}

	password, _ := bcrypt.GenerateFromPassword([]byte(registerDTO.Password), 14)

	userRegister.ID = GenerateUUID(8)
	userRegister.Name = registerDTO.Name
	userRegister.Surname = registerDTO.Surname
	userRegister.Email = registerDTO.Email
	userRegister.Password = string(password)
	userRegister.Company = registerDTO.Company
	userRegister.Role = registerDTO.Role
	userRegister.Tel = registerDTO.Tel
	userRegister.CreatedAt = time.Now().UTC().Round(time.Second)
	userRegister.UpdatedAt = time.Now().UTC().Round(time.Second)

	err := service.Repository.PostRegister(userRegister)

	if err != nil {
		return nil
	}

	return &userRegister
}

var UserNotFoundError error = errors.New("User not found")

func (service *Service) PostLogin(loginUser models.RegisterDTO) (*models.Register, error) {

	userEmail, err := service.Repository.GetUser(loginUser.Email)

	if err != nil {
		return nil, UserNotFoundError
	}

	err = bcrypt.CompareHashAndPassword([]byte(userEmail.Password), []byte(loginUser.Password))

	if err != nil {
		return nil, UserNotFoundError
	}

	return &userEmail, nil
}

func (service *Service) GetUsers() ([]models.Register, error) {

	users, err := service.Repository.GetUsers()

	if err != nil {
		return nil, err
	}

	return users, nil
}

func (service *Service) GetUser(email string) (models.Register, error) {

	user, err := service.Repository.GetUser(email)

	if err != nil {
		return models.Register{}, nil
	}

	return user, nil
}

func (service *Service) GetUserID(ID string) (models.Register, error) {

	user, err := service.Repository.GetUserID(ID)

	if err != nil {
		return models.Register{}, nil
	}

	return user, nil
}

func (service *Service) GetUserAuth(userId string) (*models.Register, error) {

	user, err := service.Repository.GetUser(userId)

	if err != nil {
		return nil, UserNotFoundError
	}
	return &user, nil
}

func GenerateUUID(length int) string {
	uuid := uuid.New().String()

	uuid = strings.ReplaceAll(uuid, "-", "")

	if length < 1 {
		return uuid
	}
	if length > len(uuid) {
		length = len(uuid)
	}

	return uuid[0:length]
}
