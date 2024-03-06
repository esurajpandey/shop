

class ProductController {
    async health(request, response) {
      response.status(200).send({
        message: 'App health checkup done',
      })
    }
}

export default new ProductController()