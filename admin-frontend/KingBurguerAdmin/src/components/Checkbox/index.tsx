import "./style.css";

interface checkboxProps{
    children?:string
}

export default function Checkbox({children}:checkboxProps) {
  return (
    <div className="checkbox-group">
      <label className="checkbox-label">
        <input type="checkbox" name="tipoCarne" value="bovina" />
        <span className="checkbox-custom">{children? children: 'carne'}</span>
      </label>

    </div>
  );
}
