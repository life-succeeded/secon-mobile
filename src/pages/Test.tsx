import { Button } from "../components/ui/button";
import { Header } from "../components/ui/header";
import Checkbox from "../components/ui/checkbox";
import ExampleComponent from "../components/ui/test";
import { ProgressBar } from "../components/ui/progressbar";
import Card from "../components/ui/card";
import Item from "../components/ui/item";
import { Alert } from "../components/ui/alert";
import { Task } from "../components/core/task";
import { Act } from "../components/core/act";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import Radio from "../components/ui/radio";
import { TaskFeed } from "../components/core/task-feed";


function Test() {
    return (
        <>
            <div className="flex h-screen flex-col">
                <div className="flex-grow overflow-auto">
                    <div className="flex w-full flex-col gap-4">
                        <Button icon="heart">Hello, world!</Button>
                        <Input placeholder="hello mr human"></Input>
                        <Checkbox label="test" checked={false} onChange={() => {}} />
                        <ExampleComponent />
                        <ProgressBar value={2} />
                        <div className="flex flex-col space-y-4">
                            <Card title="Адрес">
                                <Item icon="fileBlank" text="Hello, world!" />
                            </Card>
                        </div>
                        <Badge variant="green" text="test" />
                        <Alert text="test" />
                        <Radio label="test" name="test" />
                        <Radio label="test" name="test" />
                        <Radio label="test" name="test" />

                        <Task address="улица Пушкина 1, д 1, кв 1" />

                        <Act
                            address="улица Пушкина 1"
                            imageName="Картинка.jpeg"
                            actName="Акт.pdf"
                        />

                        <TaskFeed />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Test;