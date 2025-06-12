
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";

const EdgeDeleteButton = memo((props) => {
    const onEdgeClick = () => {
        window.alert(`Edge has been clicked!`);
    };

    return (
        <Button {...props}>
            <Button onClick={onEdgeClick} size="icon" variant="secondary">
                {/* <MousePointerClick size={16} /> */}
                hello
            </Button>
        </Button>
    );
});

export default EdgeDeleteButton;