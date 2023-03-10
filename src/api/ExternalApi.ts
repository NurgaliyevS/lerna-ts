class ExternalApi {
  async getDataFromApi() {
    const response = await fetch('http://46.175.122.190:8500/v1/kv/test');
    const [data] = await response.json();

    // Decode the base64-encoded data

    const decodedData = atob(data.Value);

    return decodedData;
  }
}

export default ExternalApi;
