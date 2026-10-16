import { Button } from '@base-ui/react/button'
import React from 'react'
import ProjectCard from './ProjectCard'

const Projects = () => {
    return (
        <div>
            <div className='p-2 flex items-center justify-between'>
                <div>
                    <p className='font-poppins font-bold text-2xl'>Projects</p>
                    <p className='text-xs'>Keep every initiative moving forward in one place.</p>

                </div>
                <Button className="bg-blue-600 p-2 rounded-lg text-xs text-white hover:opacity-80 hover:transition-all cursor-pointer font-semibold">+ New Project</Button>
            </div>

            <div>
                <ProjectCard/>
            </div>

        </div>
    )
}

export default Projects