export default function({store,route}) {
    if (route.params.passport) {
      store.dispatch('passport/loadPassport', route.params.passport)
    }
  }