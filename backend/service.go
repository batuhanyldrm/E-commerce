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

/* func (service *Service) PostStocks(productDTO models.ProductDTO) (*models.Product, error) {

	stock := models.Product{}
	stock.ID = GenerateUUID(8)
	stock.CreatedAt = time.Now().UTC().Round(time.Second)
	stock.UpdatedAt = time.Now().UTC().Round(time.Second)
	stock.ProductName = productDTO.ProductName
	stock.Description = productDTO.Description
	stock.Price = productDTO.Price
	stock.Amount = productDTO.Amount

	opt := option.WithCredentialsFile("serviceAccountKey.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return nil, fmt.Errorf("error initializing app: %v", err)
	}

	client, err := app.Storage(context.TODO())
	if err != nil {
		return nil, fmt.Errorf("error getting storage client: %v", err)
	}
	bucketHandle, err := client.Bucket(os.Getenv("BUCKET_NAME"))
	if err != nil {
		return nil, fmt.Errorf("error getting storage bucket: %v", err)
	}

	f, err := os.Open(productDTO.Image)
	if err != nil {
		fmt.Println("error opening image:", productDTO.Image)
		return nil, err
	}

	defer f.Close()

	objectHandle := bucketHandle.Object(f.Name())

	writer := objectHandle.NewWriter(context.Background())

	id := uuid.New()

	writer.ObjectAttrs.Metadata = map[string]string{"firebaseStorageDownloadTokens": id.String()}
	defer writer.Close()

	if _, err := io.Copy(writer, f); err != nil {
		return nil, fmt.Errorf("error copying file to storage: %v", err)
	}

	stock.Image = objectHandle.ObjectName() // set the image URL to the Firebase Storage URL

	err = service.Repository.PostStocks(stock)
	if err != nil {
		return nil, err
	}

	return &stock, nil
} */

func (service *Service) PostStocks(productDTO models.ProductDTO) *models.Product {

	stock := models.Product{}
	stock.ID = GenerateUUID(8)
	stock.CreatedAt = time.Now().UTC().Round(time.Second)
	stock.UpdatedAt = time.Now().UTC().Round(time.Second)
	stock.ProductName = productDTO.ProductName
	stock.Description = productDTO.Description
	stock.Price = productDTO.Price
	stock.Amount = productDTO.Amount
	//stock.Image = productDTO.Image //image için yeni eklendi

	/* for _, img := range productDTO.Image {
		img.ID = GenerateUUID(8)
		data, err := ioutil.ReadFile(img.ImageUrl)
		if err != nil {
			return nil
		}
		img.Data = data
	}
	stock.Image = productDTO.Image */

	err := service.Repository.PostStocks(stock)
	if err != nil {
		return nil
	}

	return &stock
}

func (service *Service) DeleteStocks(stockId string) error {

	err := service.Repository.DeleteStocks(stockId)

	if err != nil {
		return err
	}

	return nil
}

func (service *Service) PostRegister(registerDTO models.RegisterDTO) *models.Register {

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

func (service *Service) PostLogout(loginUser models.RegisterDTO) (*models.Register, error) {

	userEmail, err := service.Repository.GetUser(loginUser.Email)

	if err != nil {
		return nil, UserNotFoundError
	}

	return &userEmail, nil
}

func (service *Service) GetUserAuth(userId string) (*models.Register, error) {

	user, err := service.Repository.GetUserID(userId)

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
