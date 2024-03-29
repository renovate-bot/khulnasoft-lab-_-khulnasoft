module main

go 1.20

// This file exists to allow debugging of Go files within this package,
// such as `util/analyze.go`.

// You can do this by creating a VS Code Launcher Configuration
// replacing `YOUR_VERCEL_DIR` with your vercel directory, like:
// {
//   "name": "Debug Go",
//   "type": "go",
//   "request": "launch",
//   "mode": "auto",
//   "program": "${fileDirname}",
//   "args": [
//     "-modpath=YOUR_VERCEL_DIR/packages/go/test/fixtures/24-bad-handler/api/",
//     "YOUR_VERCEL_DIR/packages/go/test/fixtures/24-bad-handler/api/index.go"
//   ]
// }

require (
	github.com/dhruvbird/go-cowsay v0.0.0-20131019225157-6fd7bd0281c0
	github.com/vercel/go-bridge v0.0.0-20221108222652-296f4c6bdb6d
)

require github.com/aws/aws-lambda-go v1.43.0 // indirect
