import React, { useState, useRef, useCallback, useEffect } from 'react';
import Button from '@mui/material/Button';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import axios from 'axios';

import { useLocation } from 'react-router-dom';

import './index.css';
import Pagnation from './Pagnation';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input' },
    position: { x: 250, y: 5 },
    deletable: false,
    style: {
      borderColor: '#0041d0',
    }
  },
];

const edgeOptions = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#4f7ddf',
    },
    style: { stroke: '#4f7ddf' },
}

let id = 0;
const getId = () => `dndnode_${id++}`;
const Workflow = (props) => {

    /* Pagination */
    const [currentPage,setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dataPerPage, setDataPerPage] = useState(5)
    const [module,setModule] = useState([])
    useEffect(()=>{
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get("https://64307b10d4518cfb0e50e555.mockapi.io/modules");
            setModule(res.data);
            setLoading(false);
        }
        fetchPosts();
    },[])
    const indexOfLastPost = currentPage*dataPerPage;
    const indexOfFirstPost = indexOfLastPost - dataPerPage;
    const currentPosts = module.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber)=>setCurrentPage(pageNumber);


    const location = useLocation();
    const propsData = location.state;
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      console.log(type);
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
        targetPosition: 'top',
        style: {
          borderColor: '#0041d0',
        }
      };
      setNodes((nds) => nds.concat(newNode));
    },
    
    [reactFlowInstance]
  );
  const [variant, setVariant] = useState('cross');

  return (
    <>
    <div className='flex py-3 px-7 font-semibold border-2 border-b-blue-200'>{propsData[0]}</div>
        <aside style={{float: "left"}} className='p-0 border-2 border-r-blue-500'>
      <div className="description flex px-7 pb-4 border-b-2 font-semibold border-r-blue-500">Modules</div>
      <div className='flex flex-col pl-4 font-semibold overflow-auto'>
        {currentPosts.map((index,id)=> <div className='dndnode input w-10/12 h-12 flex justify-between items-center' key={id} onDragStart={(event)=> onDragStart(event, index.name)} draggable>
        <span className='border-2 py-3 pr-3 border-r-blue-500 bg-slate-300'>{index.input_type.toUpperCase()}</span>
            <h1>{index.name}</h1>
            <span className='border-2 py-3 pl-3 border-l-blue-500 bg-slate-300'>{index.output_type.toUpperCase()}</span>
        </div>)}
        </div>
        <Pagnation postsPerPage={dataPerPage} totalPosts={module.length} paginate={paginate}/>
    </aside>
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: 800 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            defaultEdgeOptions={edgeOptions}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            
            onDragOver={onDragOver}
            fitView
          >
          <Background color="#ccc" variant={variant} />
          <Panel>
        <div className='font-semibold'>Variant :</div>
        <Button variant="outlined" onClick={() => setVariant('dots')}>dots</Button>
        <Button variant="outlined" onClick={() => setVariant('lines')}>lines</Button>
        <Button variant="outlined" onClick={() => setVariant('cross')}>cross</Button>
      </Panel>
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
    </>
  );
};

export default Workflow;