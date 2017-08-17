module.exports = {
  __dirname,
  questions: {
    dockerRegistry: {
      message: 'Whats the docker registry',
      default: 'registry.jorgeadolfo.com'
    },
    port: {
      message: 'What port will you use',
      default: 8080
    }
  }
}