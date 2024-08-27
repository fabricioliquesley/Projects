import { Container } from "./style";
import { GoPlus } from "react-icons/go";

export function Tags({ label, className, children, addClick, ...res }) {

    return (
        <Container className={className}>
            <label htmlFor="">{label}</label>
            <div>
                <div className="tags">
                    {children}
                </div>
                <div className="addTag">
                    <input
                        type="text"
                        placeholder="Adicionar"
                        {...res}
                    />
                    <button onClick={addClick}>
                        <GoPlus size={20} />
                    </button>
                </div>
            </div>
        </Container>
    )
}