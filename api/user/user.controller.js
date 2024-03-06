
class UserController {
    async health(request, response) {
      response.status(200).send({
        message: 'User health checkup done',
      })
    }
}

export default new UserController()