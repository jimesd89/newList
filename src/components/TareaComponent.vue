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
            <h6
              class="textDatos display-4 text-center"
              v-if="listTareas.length === 0"
            >

              No hay datos disponibles
            </h6>
            
            <ul class="list-group">
              <li
                v-for="(tarea, index) of listTareas"
                :key="index"
                class="list-group-item d-flex justify-content-between"
              >
                <span class="cursor" v-bind:class="{'text-success': tarea.estado}"
                @click="editarTarea(tarea, index)">
                  <i
                    v-bind:class="[
                      tarea.estado
                        ? 'fa-solid fa-circle-check '
                        : 'fa-regular fa-circle',
                    ]"
                  ></i>
                </span>
                {{ tarea.nombre }}
                <span class="text-danger cursor" @click="eliminarTarea(index)">
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
export default {
  name: "TareaComponent",
  data() {
    return {
      tarea: "",
      listTareas: [],
    };
  },
  methods: {
    agregarTarea() {
      const tarea = {
        nombre: this.tarea,
        estado: false,
      };
      console.log("🚀 ~ agregarTarea ~ tarea:", tarea);
      this.listTareas.push(tarea);
      this.tarea = "";
    },
    editarTarea(tarea, index) {
      this.listTareas[index].estado = !tarea.estado;
    },

    eliminarTarea(index) {
      this.listTareas.splice(index, 1);
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
