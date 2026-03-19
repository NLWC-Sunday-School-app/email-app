'use client'

import React, { useRef, useEffect, useState } from 'react';
import EmailEditor from 'react-email-editor';

/**
 * Optimized Unlayer Email Editor.
 * Perfected for Figma-to-Email workflows and backward compatibility.
 * Always import with dynamic(..., { ssr: false }).
 */
const CustomEmailEditor = ({ 
    data, 
    setData, 
    design = null, 
    setDesign = null, 
    editorRef = null, 
    onBlur = null 
}) => {
    const internalRef = useRef(null);
    const activeRef = editorRef || internalRef;
    const [isLoaded, setIsLoaded] = useState(false);

    // Helper to safely parse design data
    const parseDesign = (d) => {
        if (!d) return null;
        if (typeof d === 'object') return d;
        try {
            return JSON.parse(d);
        } catch (e) {
            console.warn("Invalid design JSON:", e);
            return null;
        }
    };

    const onReady = (unlayer) => {
        console.log('Unlayer Editor Ready');
        
        // Load initial design or fallback to HTML-in-JSON
        const initialDesign = parseDesign(design);
        
        if (initialDesign) {
            unlayer.loadDesign(initialDesign);
        } else if (data && data.trim().length > 0) {
            // Backward Compatibility: If no design exists but HTML does,
            // wrap the HTML in an Unlayer 'html' block so it's not lost.
            unlayer.loadDesign({
                body: {
                    rows: [{
                        cells: [1],
                        columns: [{
                            contents: [{
                                type: 'html',
                                values: { 
                                    html: data,
                                    containerPadding: '10px',
                                    anchor: ''
                                }
                            }]
                        }]
                    }]
                }
            });
        }

        // Set up autosave/change tracking
        unlayer.addEventListener('design:updated', () => {
            unlayer.exportHtml((result) => {
                const { design: updatedDesign, html } = result;
                setData(html);
                if (setDesign) {
                    setDesign(JSON.stringify(updatedDesign));
                }
            });
        });

        if (onBlur) {
            unlayer.addEventListener('blur', onBlur);
        }
        
        setIsLoaded(true);
    };

    // Handle template switching (external design changes)
    useEffect(() => {
        const unlayer = activeRef.current?.editor;
        if (unlayer && isLoaded && design) {
            const newDesign = parseDesign(design);
            if (newDesign) {
                unlayer.loadDesign(newDesign);
            }
        }
    }, [design, isLoaded, activeRef]);

    return (
        <div className="unlayer-perfect-wrapper" style={{ height: 'calc(100vh - 250px)', minHeight: '700px', width: '100%' }}>
            <EmailEditor 
                ref={activeRef} 
                onReady={onReady} 
                options={{
                    appearance: {
                        theme: 'modern_light',
                        panels: {
                            tools: {
                                dock: 'left'
                            }
                        }
                    },
                    features: {
                        textEditor: {
                            spellChecker: true,
                            tables: true
                        }
                    },
                    tools: {
                        form: { enabled: false }
                    },
                    customCSS: [
                        `
                        .blockbuilder-placeholder { border: 2px dashed #4F46E5 !important; }
                        .blockbuilder-layer-selector { background: #4F46E5 !important; }
                        `
                    ]
                }} 
            />
            <style jsx global>{`
                .unlayer-perfect-wrapper {
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }
                /* Ensure the editor fills the space */
                #unlayer-editor-1 {
                    height: 100% !important;
                }
            `}</style>
        </div>
    );
};

export default CustomEmailEditor;
