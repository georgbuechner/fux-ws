cmake_minimum_required(VERSION 3.23)

project(fuxws)

# specify the C++ standard
set(CMAKE_CXX_STANDARD 17)                                                                          
set(CMAKE_CXX_STANDARD_REQUIRED True)
SET(CMAKE_CXX_FLAGS "-Wall -pthread -O3")
add_compile_options (-fdiagnostics-color=always)
add_compile_options(-w)

set(SRC_FILES 
  src/main.cc 
)

find_package(nlohmann_json CONFIG REQUIRED)
find_package(spdlog CONFIG REQUIRED)
find_package(httplib CONFIG REQUIRED)
find_package(websocketpp CONFIG REQUIRED)
find_package(Catch2 CONFIG REQUIRED)

add_executable(fuxws.o ${SRC_FILES})

add_compile_definitions(COMPILE_SPI_COMMANDS_FOR_CXX=1)
add_compile_definitions(JSON_DIAGNOSTICS=1)
if (COMPILE_FOR_SERVER)
  message("compiling for server...")
  target_compile_definitions(fuxws.o PUBLIC _COMPILE_FOR_SERVER_)
else()
  message("compiling for localhost...")
endif()

target_link_libraries(fuxws.o PRIVATE
  nlohmann_json::nlohmann_json 
  spdlog::spdlog 
  httplib::httplib 
  websocketpp::websocketpp 
  Catch2::Catch2
)

target_include_directories(fuxws.o PUBLIC "src")
