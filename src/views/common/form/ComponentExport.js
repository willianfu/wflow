import TextInput from './components/TextInput.vue'
import NumberInput from './components/NumberInput.vue'
import AmountInput from './components/AmountInput.vue'
import TextareaInput from './components/TextareaInput.vue'
import SelectInput from './components/SelectInput.vue'
import MultipleSelect from './components/MultipleSelect.vue'
import DateTime from './components/DateTime.vue'
import DateTimeRange from './components/DateTimeRange.vue'

import Description from './components/Description.vue'
import ImageUpload from './components/ImageUpload.vue'
import FileUpload from './components/FileUpload.vue'
import Location from './components/Location.vue'
import MoneyInput from './components/MoneyInput.vue'
import DeptPicker from './components/DeptPicker.vue'
import UserPicker from './components/UserPicker.vue'
import SignPanel from './components/SignPannel.vue'

export default {
  //基础组件
  TextInput, NumberInput, AmountInput, TextareaInput, SelectInput, MultipleSelect,
  DateTime, DateTimeRange, UserPicker, DeptPicker,
  //高级组件
  Description, FileUpload, ImageUpload, MoneyInput, Location, SignPanel

}
