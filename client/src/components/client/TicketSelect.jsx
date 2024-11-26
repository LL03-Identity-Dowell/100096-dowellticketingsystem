// TicketSelect.js
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import propTypes from 'prop-types'

const TicketSelect = ({ placeholder, className, fieldType, type, data, name, handleInputChange }) => {
  return (
    <div>
      {fieldType === 'input' ? (
        <Input type={type} placeholder={placeholder} className={className} onChange={(e) => handleInputChange(e.target.value, name)} />
      ) : (
        <Select onValueChange={(value) => handleInputChange(value, name)}>
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {data?.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};


TicketSelect.propTypes = {
  placeholder: propTypes.string,
  className: propTypes.string,
  fieldType: propTypes.string,
  type: propTypes.string,
  data: propTypes.array,
  handleInputChange: propTypes.func,
  name: propTypes.string,
}
export default TicketSelect;
