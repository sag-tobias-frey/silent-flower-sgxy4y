import React, { useState, Suspense } from 'react';

import { Tree, TreeItem, TreeItemLayout } from "@fluentui/react-components";
import { DefaultButton, ThemeProvider, initializeIcons } from '@fluentui/react';

function DummyComponent() {
  return "Dummy";
}

const LazyComponent = React.lazy(() => delay({ default: DummyComponent }))

export default function App() {
  const [lazyLoaded, setLazyLoaded] = useState(false);
  const [treeLoaded, setTreeLoaded] = useState(true);

  return (
      <ThemeProvider>
        <div>
          <input type="button" value="LazyLoad Component" onClick={() => setLazyLoaded(old => !old)} />
          <input type="button" value="Unload Component" onClick={() => setTreeLoaded(old => !old)} />
        </div>
        <Suspense>
          { lazyLoaded && (<LazyComponent />) }
          { treeLoaded && (
            <Tree aria-label="Default">
              <TreeItem itemType="branch">
                <TreeItemLayout>level 1, item 1</TreeItemLayout>
                <Tree>
                  <TreeItem itemType="leaf">
                    <TreeItemLayout>level 2, item 1</TreeItemLayout>
                  </TreeItem>
                  <TreeItem itemType="leaf">
                    <TreeItemLayout>level 2, item 2</TreeItemLayout>
                  </TreeItem>
                  <TreeItem itemType="leaf">
                    <TreeItemLayout>level 2, item 3</TreeItemLayout>
                  </TreeItem>
                </Tree>
              </TreeItem>
              <TreeItem itemType="branch">
                <TreeItemLayout>level 1, item 2</TreeItemLayout>
                <Tree>
                  <TreeItem itemType="branch">
                    <TreeItemLayout>level 2, item 1</TreeItemLayout>
                    <Tree>
                      <TreeItem itemType="leaf">
                        <TreeItemLayout>level 3, item 1</TreeItemLayout>
                      </TreeItem>
                    </Tree>
                  </TreeItem>
                </Tree>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 1, item 3</TreeItemLayout>
              </TreeItem>
            </Tree>
          )}
        </Suspense>
      </ThemeProvider>
  );
}

function delay(cmp) {
  return new Promise(resolve => {
    setTimeout(() => resolve(cmp), 2500);
  });
}
