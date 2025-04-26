#include <filesystem>
#include <httplib.h> 
#include <iostream>
#include <thread>

#define HTML_PATH "web/"

int main() {
  std::thread thread_http([]() {
    httplib::Server http_server;
    http_server.set_mount_point("/", HTML_PATH);
    std::cout << "Started file server" << std::endl;
    http_server.listen("0.0.0.0", 4080);
  });

  thread_http.join();
}
