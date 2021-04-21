<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      disable-resize-watcher
      color="#272727"
      width="300"
    >
      <!-- <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list> -->

      <!-- <v-treeview
        open-on-click
        open-all
        :items="items">
            <template slot="label" slot-scope="props">
                <nuxt-link :to="props.item.to" v-if="props.item.to" text nuxt block>{{ props.item.name }}</nuxt-link>
                <span v-else>{{ props.item.name }}</span>
            </template>
      </v-treeview> -->

      <v-list-group
        value="true"
      >
        <template v-slot:activator>
          <v-list-item-title class="white--text">Меню</v-list-item-title>
        </template>

              <v-list>
        <v-list-item
          v-for="(item, i) in menu.common"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action class="mr-2">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      </v-list-group>

    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" clipped-right fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />


        <v-snackbar
                :value="!$store.state.runtime.status_connection"
                color="red"
                top
                centered
                :timeout="15000"
                >
                Потеря связи с сервером

                <template v-slot:action="{ attrs }">
                    <v-btn
                    dark
                    text

                    >
                    Close
                    </v-btn>
                </template>
            </v-snackbar>

      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}  Developer Vladimir Chmyr</span>
      <v-spacer></v-spacer>

      <v-chip
      v-if="$store.state.runtime.status_connection"
      small
      class="ma-2"
      color="green"
    >
      <v-avatar left>
        <v-icon>mdi-access-point</v-icon>
      </v-avatar>
      Connect
    </v-chip>

    <v-chip
      v-else
      small
      class="ma-2"
      color="red"
    >
      <v-avatar left>
        <v-icon>mdi-access-point-off</v-icon>
      </v-avatar>
      Dissconect
    </v-chip>

    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      menu: {
        common: [
        {
          icon: 'mdi-monitor-dashboard',
          title: 'Конвертер 2',
          to: '/konverter2'
        },
        {
          icon: 'mdi-table-large',
          title: 'Паспорта плавок',
          to: '/passports'
        },
        {
          icon: 'mdi-chart-bar',
          title: 'charts',
          to: '/charts'
        },
        {
          icon: 'mdi-home-assistant',
          title: 'Помещение АСУТП (отм. 14)',
          to: '/rooms_control'
        },
        ]
      },
      // items: [
      //   {
      //     icon: 'mdi-apps',
      //     title: 'Конвертер 1',
      //     to: '/konverter1',
      //   },
      //   {
      //     icon: 'mdi-apps',
      //     title: 'Конвертер 2',
      //     to: '/konverter2'
      //   },
      //   {
      //     icon: 'mdi-apps',
      //     title: 'Паспорта плавок',
      //     to: '/passports'
      //   },
      //   {
      //     icon: 'mdi-apps',
      //     title: 'charts',
      //     to: '/charts'
      //   },
      //   // {
      //   //   icon: 'mdi-chart-bubble',
      //   //   title: 'Inspire',
      //   //   to: '/inspire'
      //   // }
      // ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'WEB HMI'
    }
  }
}
</script>
