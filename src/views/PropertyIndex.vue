<script>
import axiosInstance from "@/api/axios.instance.js";
import {convertDateFromIso} from "../utils/date.utils.js";
import PropertiesApi from "@/api/properties.api.js";

export default {
  name: 'PropertyIndex',
  data() {
    return {
      isLoading: true,

      filters: {
        name: '',
        bedrooms: null,
        bathrooms: null,
        storeys: null,
        garages: null,
        priceFrom: null,
        priceTo: null,
      },
      properties: [],

      activePage: 1,
      perPage: 5,
      isLastPage: false,
    }
  },
  methods: {
    convertDateFromIso,
    resetFilters() {
      this.filters = {
        name: '',
        bedrooms: null,
        bathrooms: null,
        storeys: null,
        garages: null,
        priceFrom: null,
        priceTo: null,
      }
    },

    getProperties(afterLoadCallback = null) {
      this.isLoading = true

      PropertiesApi.getAll({
        page: this.activePage,
        per_page: this.perPage,
        ...this.filters
      })
          .then((response) => {
            if (afterLoadCallback instanceof Function) afterLoadCallback();

            this.properties = this.properties.concat(response.data.items)
            this.isLastPage = response.data.totalPages === this.activePage;
          })
          .finally(() => {
            this.isLoading = false
          })
    },
    applyFilterToProperties() {
      this.activePage = 1;
      this.getProperties(() => {
        this.properties = []
      })
    },
    loadMoreProperties() {
      this.activePage++
      this.getProperties()
    }
  },
  created() {
    this.getProperties()
  }
}
</script>

<template>
  <main class="properties">
    <h1 class="properties__title">Properties</h1>
    <div class="properties__filter">
      <el-form :model="filters" @submit.native>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="Name">
              <el-input
                v-model="filters.name"
                placeholder="Search by name"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Bedrooms">
              <el-input-number
                v-model="filters.bedrooms"
                :min="1"
                :max="10"
                placeholder="Bedrooms"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Bathrooms">
              <el-input-number
                v-model="filters.bathrooms"
                :min="1"
                :max="10"
                placeholder="Bathrooms"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Storeys">
              <el-input-number
                v-model="filters.storeys"
                :min="1"
                :max="10"
                placeholder="Storeys"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="Garages">
              <el-input-number
                v-model="filters.garages"
                :min="0"
                :max="10"
                placeholder="Garages"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item label="Price Range">
              <el-row>
                <el-input-number
                  v-model="filters.priceFrom"
                  placeholder="Min Price"
                  prefix="$"
                />
                &nbsp;
                <el-input-number
                  v-model="filters.priceTo"
                  prefix="$"
                  placeholder="Max Price"
                />
              </el-row>

            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="applyFilterToProperties()">Search</el-button>
          <el-button @click="resetFilters()">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-progress
        v-if="isLoading"
        :percentage="100"
        :indeterminate="true"
        :duration="1"
        :show-text="false"
    />
    <el-table
        :data="properties"
        border
        :class="[
          'properties__table',
          {
            'properties__table_loading': isLoading
          }
        ]"
        :empty-text="isLoading ? '' : 'No properties found'"
    >
      <el-table-column prop="name" label="Name"/>
      <el-table-column label="Price">
        <template #default="scope">
          ${{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column prop="bedrooms" label="Bedrooms"/>
      <el-table-column prop="bathrooms" label="Bathrooms"/>
      <el-table-column prop="storeys" label="Storeys"/>
      <el-table-column prop="garages" label="Garages"/>
      <el-table-column prop="created_at" label="Created At">
        <template #default="scope">
          {{ convertDateFromIso(scope.row.created_at) }}
        </template>
      </el-table-column>
    </el-table>

    <el-button
        type="primary"
        class="properties__load-more-btn"
        @click="loadMoreProperties()"
        v-if="!isLastPage"
    >
      Load More
    </el-button>
  </main>
</template>
<style>
.properties__filter {
  padding: 20px;
  border: 1px solid #eee;
  margin-bottom: 30px;
}

.properties__load-more-btn {
  margin: 20px auto 0;
}
.properties__title {
  text-align: center;
  margin-bottom: 30px;
}
.properties__table {
  transition: .3s opacity;
}
.properties__table_loading {
  opacity: 0.5;
}
</style>