import fs from 'fs'

// try {
//   const data = fs.readFileSync('test.txt', 'utf8')
//   console.log(data)
// } catch (err) {
//   console.error(err)
// }

// console.log("Hello!")

// fs.readFile('test.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data)
// })

// console.log("Hello!")

// let content = "This is what will be written to the file"

// try {
//   fs.writeFileSync('test.txt', content)
//   console.log("File written!")
// } catch (err) {
//   console.error(err)
// }

// fs.readFile('test.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data)
// })

// let content = "This is what will be written to the file"

// fs.writeFile('test.txt', content, (err) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log("File written!")
// })

// fs.readFile('test.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data)
// })

// fs.stat('test.txt', (err, stats) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(stats)
// })

// try {
//   fs.readFile('test.txt', 'utf-8', (err, data) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     console.log(data)
//   })
// } catch (err) {
//   console.error(err)
// }

// console.log("finished");

// let content = "hey gta6 is going to release soon!"
// try {
//   fs.writeFile('test.txt', content, (err) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     console.log("File written!")
//   })
// } catch (error) {
//   console.error(error)
// }

// fs.stat('test.txt' , (err, stats) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(stats)
// })

// fs.open('test.txt', 'r', (err, fd) => {
//   if (err) {
//     console.error(err)
//     return
//   }

//   fs.read(fd, (err, data) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     console.log(data.toString('utf-8'))
//   })
//   console.log(fd)

//   fs.close(fd, (err) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//   })
// })