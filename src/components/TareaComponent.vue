<template>
  <div>
    <h1 class="display-4 text-center">Listado de tareas</h1>
    <hr />
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <div class="input-group">
              <input
                type="text"
                v-model="tarea"
                class="form-control form-control-lg"
                placeholder="Agregar tarea"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-success btn-lg"
                  @click="agregarTarea()"
                  style="border-left-width: 1px; margin-left: 10px"
                >
                  Agregar
                </button>
              </div>
            </div>
            <br />
            <div class="text-center">
              <div
                v-if="loading"
                class="spinner-border text-success"
                role="status"
              >
                <span class="visually-hidden">Cargando...</span>
              </div>
            </div>
            <h6
              class="textDatos display-4 text-center"
              v-if="listTareas.length === 0"
            >
              No hay datos disponibles
            </h6>

            <ul v-if="!loading" class="list-group">
              <li
                v-for="(tarea, index) of listTareas"
                :key="index"
                class="list-group-item d-flex justify-content-between"
              >
                <span
                  class="cursor"
                  v-bind:class="{ 'text-success': tarea.estado }"
                  @click="editarTarea(tarea, tarea.id)"
                >
                  <i
                    v-bind:class="[
                      tarea.estado
                        ? 'fa-solid fa-circle-check '
                        : 'fa-regular fa-circle',
                    ]"
                  ></i>
                </span>
                {{ tarea.nombre }}
                <span
                  class="text-danger cursor"
                  @click="eliminarTarea(tarea.id)"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteTarea, getTareas, postTarea, putTarea } from "@/service/actions";
import Swal from "sweetalert2";

export default {
  name: "TareaComponent",
  data() {
    return {
      tarea: "",
      listTareas: [],
      loading: false,
    };
  },
  created() {
    this.obtenerListTareas();
  },
  methods: {
    async agregarTarea() {
      try {
        if (this.tarea == "") {
          Swal.fire("Debe ingresar una tarea", "", "warning");
        }
        const tarea = {
          nombre: this.tarea,
          estado: false,
        };
        const res = await postTarea(tarea);
        if (res.status === 200) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "La tarea ha sido agregada con éxito",
            showConfirmButton: false,
            timer: 1500,
          });
          this.obtenerListTareas();
        }
        this.tarea = "";
      } catch {
        this.loading = false;
      }
    },
    async editarTarea(tarea, id) {
      // this.listTareas[index].estado = !tarea.estado;
      try {
        const response = await putTarea(id, tarea);
        if (response.status === 200) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "La tarea ha sido actualizada con éxito",
            showConfirmButton: false,
            timer: 1500,
          });
          this.obtenerListTareas();
        }
      } catch {
        this.loading = false;
      }
    },

    async eliminarTarea(id) {
      try {
        const resp = await deleteTarea(id);
        if (resp.status === 200) {
          Swal.fire({
            title: "¿Está seguro que desea eliminar la tarea?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "La tarea ha sido eliminada con éxito",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
          this.obtenerListTareas();
        }
      } catch {
        this.loading = false;
      }

      //this.listTareas.splice(index, 1);
    },
    async obtenerListTareas() {
      try {
        this.loading = true;
        const resp = await getTareas();
        this.listTareas = resp;
        console.log("🚀 ~ obtenerListTareas ~ resp:", resp);
        this.loading = false;
      } catch {
        return [];
      }
    },
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
.textDatos {
  color: rgba(78, 77, 77, 0.801);
  font-size: 24px;
}
</style>
