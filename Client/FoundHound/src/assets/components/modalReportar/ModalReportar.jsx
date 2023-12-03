const ModalReportar = ({children, estado,cambiarEstado2}) => {
    return (
        <>
        {estado &&

        <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,.5)] flex items-center justify-center z-10">
            <div className="w-[650px] min-h-[100px] bg-[#fff] relative rounded-[0.75rem] shadow-[100,100,111,0.2] p-[30px]"> 
                {children}
            </div>

        </div>
        }
        </>
    );
}

export default ModalReportar;