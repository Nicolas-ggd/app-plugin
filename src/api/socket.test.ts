import { Socket, io } from "socket.io-client";

// Socket server URL
const serverURL = "http://localhost:8080/";

describe("Socket Connection Test", () => {
  let socket: Socket;

  beforeAll((done) => {
    // Increase the timeout to 10000 ms (10 seconds)
    jest.setTimeout(10000);

    // Connect to the socket.io server before running tests
    socket = io(serverURL);

    // Handle errors
    socket.on("error", (error) => {
      console.error("Socket connection error:", error);
      done(error);
    });

    // Wait for the socket to connect before proceeding with tests
    socket.on("connect", () => {
      done();
    });
  });

  afterAll(() => {
    // Disconnect the socket after all tests are done
    if (socket.connected) {
      socket.disconnect();
    }
  });

  it("should connect to the server", (done) => {
    // The socket should be connected to the server
    expect(socket.connected).toBeTruthy();
    done();
  });
});
