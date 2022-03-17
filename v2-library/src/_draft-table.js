import React from "react";

export default function () {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    // tables

                    <table className="tutor-table">
                        <thead className="tutor-text-sm tutor-text-400">
                            <tr>
                                <th>Order Id</th>
                                <th>Course Name</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th className="tutor-shrink">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody className="tutor-text-500">
                            <tr>
                                <td>#D798987</td>
                                <td>Javascript Tutorial For Beginners</td>
                                <td>27 Mar, 2019</td>
                                <td>$149.00</td>
                                <td className="tutor-shrink tutor-text-hints"><i className="fas fa-receipt"></i></td>
                            </tr>
                            <tr>
                                <td>#D798987</td>
                                <td>Content Marketing: Grow Your Business with....</td>
                                <td>27 Mar, 2019</td>
                                <td>$149.00</td>
                                <td className="tutor-shrink tutor-text-hints"><i className="fas fa-receipt"></i></td>
                            </tr>
                            <tr>
                                <td>#D798987</td>
                                <td>Digital Marketing Masterclass</td>
                                <td>27 Mar, 2019</td>
                                <td>$149.00</td>
                                <td className="tutor-shrink tutor-text-hints"><i className="fas fa-receipt"></i></td>
                            </tr>
                            <tr>
                                <td>#D798987</td>
                                <td>Create Your Own WordPress Website</td>
                                <td>27 Mar, 2019</td>
                                <td>$149.00</td>
                                <td className="tutor-shrink tutor-text-hints"><i className="fas fa-receipt"></i></td>
                            </tr>
                        </tbody>
                    </table>

                    <br/>

                    <div className="row">
                        <div className="col-4">
                            <table className="tutor-table tutor-is-sm">
                                <tbody>
                                    <tr>
                                        <td><span className="tutor-text-xs">Date</span></td>
                                        <td><span className="tutor-text-dark">27 Mar, 2019</span></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="tutor-text tutor-text-dark">The Complete Android Oreo Developer Course - Build 23 Apps!</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span className="tutor-text-xs">Question</span></td>
                                        <td><span className="tutor-text-dark">23</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="tutor-text-xs">Total Marks</span></td>
                                        <td><span className="tutor-text-dark">50</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="tutor-text-xs">Correct Answer</span></td>
                                        <td><span className="tutor-text-dark">8</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="tutor-text-xs">Earned Marks</span></td>
                                        <td><span className="tutor-text-dark">17(40%)</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="tutor-text-xs">Result</span></td>
                                        <td><span className="tutor-badge tutor-bg-danger">Fail</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-4">
                            <table className="tutor-table tutor-is-sm">
                                <tbody>
                                    <tr>
                                        <td colSpan="2">
                                            <p className="tutor-text-sm tutor-text-500 tutor-text-dark tutor-mb-4">Be more friendly with social media</p>
                                            <p className="tutor-text-sm">Course: Write PHP Like a Pro: Build a PHP MVC Framework From Scratch</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span className="tutor-text-xs">Total Marks</span></td>
                                        <td><span className="tutor-text-dark">10</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="tutor-text-xs">Total Submit</span></td>
                                        <td><span className="tutor-text-dark">32</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-4">
                            <table className="tutor-table tutor-is-sm">
                                <tbody>
                                    <tr>
                                        <td colSpan="2">
                                            <p className="tutor-text-sm">Order ID #D798987</p>
                                            <p className="tutor-text-sm tutor-text-500 tutor-text-dark tutor-mb-4">Be more friendly with social media</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span className="tutor-text-xs">Date</span></td>
                                        <td><span className="tutor-text-dark">27 Mar, 2019</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="tutor-text-xs">Price</span></td>
                                        <td><span className="tutor-text-dark">$132.00</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}