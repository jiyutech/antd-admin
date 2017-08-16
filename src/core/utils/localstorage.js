import { localStorageKeys, prefix } from 'config'


export default {
  /*
   * localStorage.getItem() 封装
   */
  get: function(key){
    if ( !this.parseKey(key) ) throw('请在使用`localStorage.get()`前，先在`config/ls-keys.js`处配置该key：'+ key)
    return JSON.parse(localStorage.getItem(this.parseKey(key)));
  },
  /*
   * localStorage.setItem() 封装
   */
  set: function(key, value){
    if ( !this.parseKey(key) ) throw('请在使用`localStorage.get()`前，先在`config/ls-keys.js`处配置该key：'+ key)
    localStorage.setItem(this.parseKey(key), JSON.stringify(value));
  },
  /*
   * localStorage.removeItem() 封装
   */
  remove: function(key){
    if ( !this.parseKey(key) ) throw('请在使用`localStorage.get()`前，先在`config/ls-keys.js`处配置该key：'+ key)
    localStorage.removeItem(this.parseKey(key));
  },

  parseKey( key ){
    return (key && localStorageKeys.includes(key)) ? `${prefix}_${key}` : ''
  }
}
