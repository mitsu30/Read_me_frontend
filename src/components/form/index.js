/* POINT コンポーネントを組み合わせて大きめのコンポーネント作成 */
import Button from "../button";
import Input from "../input";

export default function Form({
  handleAddClick,
  handleResetClick,
  handleChange,
  nameValue,
  birthValue,
}) {
  return (
    <form>
      <fieldset>
        <legend>個人情報</legend>

        <Input
          label="お名前"
          id="name"
          type="text"
          value={nameValue}
          handleChange={handleChange}
        />
        <Input
          label="生年月日"
          id="birth"
          type="date"
          value={birthValue}
          handleChange={handleChange}
        />
      </fieldset>
      <Button
        text="追加"
        type="button"
        handleClick={handleAddClick}
        disabled={!nameValue || !birthValue}
      />
      <Button text="リセット" type="button" handleClick={handleResetClick} />
    </form>
  );
}
