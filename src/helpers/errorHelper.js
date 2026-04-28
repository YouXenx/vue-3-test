// src/helpers/error.js

export function getErrorMessage(error) {
  if (error.response) {
    const status = error.response.status;

    if (error.response.data?.message) {
      return error.response.data.message;
    }

    switch (status) {
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Data tidak ditemukan";
      case 500:
        return "Server error";
      default:
        return "Terjadi kesalahan pada server";
    }
  }

  // Jika tidak ada response (network error)
  if (error.request) {
    return "Tidak dapat terhubung ke server";
  }

  // Error lainnya
  return error.message || "Terjadi kesalahan";
}
