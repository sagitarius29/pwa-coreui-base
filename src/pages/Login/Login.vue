<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="signIn">
                  <h1>Ingresar</h1>
                  <p class="text-muted">Ingresa con tu cuenta</p>
                  <b-form-group :invalid-feedback="(errors.email !== undefined) ? errors.email[0] : ''" :state="!isInvalid('email')">
                    <b-input-group class="mb-3">
                      <b-input-group-prepend>
                        <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input v-model="document.email" type="email" placeholder="Email" :class="'form-control' + isInvalidClass('email')" />
                    </b-input-group>
                  </b-form-group>
                  <b-form-group :invalid-feedback="(errors.password !== undefined) ? errors.password[0] : ''" :state="!isInvalid('password')">
                    <b-input-group class="mb-4">
                      <b-input-group-prepend>
                        <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input v-model="document.password" type="password" :class="'form-control' + isInvalidClass('password')" placeholder="Contraseña" />
                    </b-input-group>
                  </b-form-group>
                  <b-row>
                    <b-col cols="5">
                      <b-button type="submit" variant="primary" class="px-4">Ingresar</b-button>
                    </b-col>
                    <b-col cols="7" class="text-right">
                      <!-- <b-button variant="link" class="px-0">Olvidó su contraseña?</b-button> -->
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div style="margin-top:55px;">
                  <h2>Ferreyros</h2>
                  <p>Software de gestión logística y transporte</p>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data(){
      return {
        document: {
          email: '',
          password: '',
        },
        errors: {
        }
      }
    },
    mounted(){
      this.$store.dispatch('user/resetState').catch((error) => {
        console.log('ERRORS', error.data.errors);
        if(error.data.errors !== undefined) {
          this.errors = error.data.errors;
        }
      });
    },
    methods: {
      signIn() {
        this.$store.dispatch('user/login', this.document).catch((error) => {
          if(error.data.errors !== undefined) {
            this.errors = error.data.errors;
          }
        });
      },
      isInvalid(bind) {
        return this.errors[bind] !== undefined;
      },
      isInvalidClass(bind) {
        if(this.isInvalid(bind)) {
          return ' is-invalid';
        }
        return '';
      }
    }
  }
</script>
