import axiosInstance from "@/api/axios.instance.js";

export default {
    resource: 'properties',
    async getAll(queryParams) {
        return await axiosInstance.get(this.resource, {
            params: queryParams
        })
    }
}