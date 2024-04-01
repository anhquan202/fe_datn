import { useEffect, useState } from "react";
import * as searchServices from "src/services/searchService";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import useDebounce from "src/hooks/useDebounce";
function Search({ placeholder, api, name, params, onSelected, onEnterPressed , onKeyChange, className }) {
  const [key, setKey] = useState("");
  const [result, setResult] = useState([]);
  const [isVisibleTippy, setIsVisibleTippy] = useState(false);
  const debounced = useDebounce(key, 700);
  Search.defaultProps = {
    onKeyChange: () => {} // Truyền một hàm trống làm giá trị mặc định
  };
  useEffect(() => {
    onKeyChange(key);
  }, [key, onKeyChange]);
  useEffect(() => {
    try {
      if (!debounced.trim()) {
        setResult([]);
        setIsVisibleTippy(false);
        return;
      }
      const searchProduct = async () => {
        const { data, success } = await searchServices.searchData(
          { ...params, [name]: debounced },
          api
        );
        if (success && data) {
          setResult(data.data);
          setIsVisibleTippy(true);
        }
      };
      searchProduct();
    } catch (error) {
      console.log(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, api, params]);
  console.log(result);
  const handleClick = (item) => {
    onSelected(item);
    setKey(item.name);
    handleHideTippy();
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onEnterPressed(key);
      handleHideTippy();
    }
  };
  const handleHideTippy = () => {
    if (result.length === 0) {
      setKey(""); // Xóa key trong ô input
    }
    setResult([]);
    setIsVisibleTippy(false);
  };
  return (
    <Tippy
      interactive
      onClickOutside={handleHideTippy}
      visible={isVisibleTippy}
      placement="bottom"
      render={(attrs) => (
        <div tabIndex="-1" {...attrs}>
          {result.length === 0 ? (
            <div className="text-danger">Not data</div>
          ) : (
            <ul className="list-group">
              {result.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item"
                  onClick={() => handleClick(item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    >
      <input
        type="text"
        className= {`form-control ${className}`}
        name={name}
        value={key}
        onChange={(e) => setKey(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
      />
    </Tippy>
  );
}

export default Search;
