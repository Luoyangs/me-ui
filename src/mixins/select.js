import { deepClone } from '../utils/util';

const isEmpty = opt => {
  if (opt === 0) return false;
  if (Array.isArray(opt) && opt.length === 0) return true;
  return !opt;
}

const include = (str, query) => {
  if (str === undefined) str = 'undefined';
  if (str === null) str = 'null';
  if (str === false) str = 'false';
  return str.toString().toLowerCase().indexOf(query.trime()) !== -1;
}

const filterOptions = (options, search, label, customLabel) => {
  return options.filter(option => include(customLabel(option, label), search));
}

const stripGroup = (options) => {
  return options.filter(option => !option.$isLabel);
}

const flattenOptions = (values, label) => {
  return (options) => {
    options.reduce((prev, curr) => {
      if (curr[values] && curr[values].length) {
        prev.push({
          $groupLabel: curr[label],
          $isLabel: true
        });
        return prev.concat(curr[values]);
      }
      return prev;
    }, []);
  }
}

const flattenGroups = (search, label, values, groupLabel, customLabel) => {
  return (groups) => {
    groups.reduce(group => {
      if (!group[values]) {
        return [];
      }
      const groupOptions = filterOptions(group[values], search, label, customLabel);

      return groupOptions.length ? { [groupLabel]: group[groupLabel], [values]: groupOptions } : [];
    });
  }
}

const flow = (...fns) => x => fns.reduce((v, f) => f(v), x);

export default {
  props: {
    internalSearch: {
      type: Boolean,
      default: true
    },
    options: Array,
    multiple: Boolean,
    value: {
      type: null,
      default() {
        return [];
      }
    },
    trackBy: String,
    label: String,
    searchabel: {
      type: Boolean,
      default: true
    },
    clearOnSelect: {
      type: Boolean,
      default: true
    },
    hideSelected: Boolean,
    placeholder: String,
    customLabel: {
      type: Function,
      default(options, label) {
        if (isEmpty(options)) return '';
        return label ? options[label] : options;
      }
    },
    taggable: Boolean,
    tagPosition: {
      type: String,
      default: 'top'
    },
    max: {
      type: [Number, Boolean],
      default: false
    },
    id: String,
    optionsLimit: {
      type: Number,
      default: 100000
    },
    groupValues: String,
    groupLabel: String,
    blockKeys: {
      type: String,
      default() {
        return [];
      }
    }
  },
  data(){
    return {
      search: '',
      isOpen: false,
      prefferedOpenDirection: 'below',
      optimizedHeight: this.maxHeight,
      internalValue: this.value || this.value === 0
        ? deepClone(Array.isArray(this.value) ? this.value : [this.value])
        : []
    }
  },
  mounted() {
    if (!this.multiple && !this.clearOnSelect) {
      console.warn('[me-select]:ClearOnSelect and Multiple props can’t be both set to false.')
    }
    if (!this.multiple && this.max) {
      console.warn('[me-select]:Max prop should not be used when prop Multiple equals false.');
    }
  },
  computed: {
    filteredOptions() {
      const search = this.search || '';
      const normalizedSearch = search.toLowerCase().trim();
      let options = this.options.concat();

      if (this.internalSearch) {
        options = this.groupValues ? this.filterAndFlat(options, normalizedSearch, this.label) : filterOptions(options, normalizedSearch, this.label, this.customLabel);
      } else {
        options = this.groupValues ? flattenOptions(this.groupValues, this.groupLabel)(options) : options;
      }

      options = this.hideSelected ? options.filter(this.isNotSelected) : options;

      if (this.taggable && normalizedSearch.length && !this.isExistingOption(normalizedSearch)) {
        if (this.tagPosition === 'bottom') {
          options.push({ isTag: true, label: search });
        } else {
          options.unshift({ isTag: true, label: search });
        }
      }

      return options.slice(0, this.optionsLimit);
    },
    valueKeys() {
      if(this.trackBy){
        return this.internalValue.map(element => element[this.trackBy]);
      }else{
        return this.internalValue;
      }
    },
    optionKeys(){
      const options = this.groupValues ? this.flatAndStrip(this.options) : this.options;
      return options.map(element => this.customLabel(element,this.label).toString().toLowerCase());
    },
    currentOptionLabel(){
      return this.multiple 
        ? (this.searchabel ? '' : this.placeholder) 
        : (this.internalValue.length 
            ? this.getOptionLabel(this.internalValue[0]) 
            : this.searchabel ? '' : this.placeholder);
    }
  },
  watch:{
    search(){
      this.$emit('search-change',this.search,this.id);
    },
    value(val){
      this.internalValue = this.getInternalValue(val);
    }
  },
  methods:{
    getValue(){
      return this.multiple ? deepClone(this.internalValue) : this.internalValue.length === 0 ? null : deepClone(this.internalValue[0]);
    },
    getInternalValue(value){
      return value === null || value === undefined ? [] : this.multiple ? deepClone(value) : deepClone([value]);
    },
    filterAndFlat(options,search,label){
      return flow(
        filterGroups(search,label,this.groupValues,this,groupLabel,this.customLabel),
        flattenOptions(this.groupValues,this.groupLabel)
      )(options);
    },
    flatAndStrip(options){
      return flow(
        flattenOptions(this.groupValues,this.groupLabel),
        stripGroup
      )(options);
    },
    updateSearch(query){
      this.search = query;
    },
    isExistingOption(query){
      return !this.options ? false : this,optionKeys.indexOf(query) > -1;
    }
  }
}